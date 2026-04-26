// ETHINX Authenticode Code Signing Script
// Used by electron-builder for Windows code signing
//
// Required environment variables:
//   CSC_LINK        - Path to .pfx certificate file OR base64-encoded certificate
//   CSC_KEY_PASSWORD - Certificate password
//
// For EV certificates (hardware token / HSM):
//   SIGNTOOL_PATH    - Path to signtool.exe (optional, auto-detected)
//   EV_CERT_THUMBPRINT - Certificate thumbprint for EV signing
//
// For Azure Trusted Signing:
//   AZURE_SIGN_ENDPOINT - Azure signing endpoint URL
//   AZURE_SIGN_CERT_PROFILE - Certificate profile name

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Locate signtool.exe
function findSignTool() {
  if (process.env.SIGNTOOL_PATH && fs.existsSync(process.env.SIGNTOOL_PATH)) {
    return process.env.SIGNTOOL_PATH;
  }

  const sdkPaths = [
    "C:\\Program Files (x86)\\Windows Kits\\10\\bin",
    "C:\\Program Files\\Windows Kits\\10\\bin",
  ];

  for (const sdkPath of sdkPaths) {
    if (!fs.existsSync(sdkPath)) continue;
    const versions = fs.readdirSync(sdkPath).filter(d => d.match(/^\d+\.\d+/)).sort().reverse();
    for (const ver of versions) {
      const tool = path.join(sdkPath, ver, "x64", "signtool.exe");
      if (fs.existsSync(tool)) return tool;
    }
  }

  // Fallback: hope it's on PATH
  return "signtool.exe";
}

/**
 * Custom sign function for electron-builder
 * @param {object} configuration - { path, hash, isNest }
 */
exports.default = async function sign(configuration) {
  const filePath = configuration.path;
  const hash = configuration.hash || "sha256";

  console.log(`[SIGN] Signing: ${path.basename(filePath)} (${hash})`);

  const signtool = findSignTool();
  const timestampServer = "http://timestamp.digicert.com";
  const timestampServerRFC3161 = "http://timestamp.digicert.com";

  // Method 1: EV Certificate via thumbprint (hardware token / HSM)
  if (process.env.EV_CERT_THUMBPRINT) {
    const cmd = [
      `"${signtool}"`, "sign",
      "/tr", timestampServerRFC3161,
      "/td", hash,
      "/fd", hash,
      "/sha1", process.env.EV_CERT_THUMBPRINT,
      "/d", '"ETHINX"',
      "/du", '"https://ethinx.com"',
      `"${filePath}"`,
    ].join(" ");

    execSync(cmd, { stdio: "inherit" });
    console.log(`[SIGN] ✓ EV signed: ${path.basename(filePath)}`);
    return;
  }

  // Method 2: PFX certificate file (standard OV/IV)
  if (process.env.CSC_LINK) {
    let certPath = process.env.CSC_LINK;

    // If base64-encoded, decode to temp file
    if (!fs.existsSync(certPath) && certPath.length > 260) {
      const tmpCert = path.join(process.env.TEMP || "/tmp", "ethinx-cert.pfx");
      fs.writeFileSync(tmpCert, Buffer.from(certPath, "base64"));
      certPath = tmpCert;
    }

    const password = process.env.CSC_KEY_PASSWORD || "";
    const cmd = [
      `"${signtool}"`, "sign",
      "/f", `"${certPath}"`,
      "/p", `"${password}"`,
      "/tr", timestampServerRFC3161,
      "/td", hash,
      "/fd", hash,
      "/d", '"ETHINX"',
      "/du", '"https://ethinx.com"',
      `"${filePath}"`,
    ].join(" ");

    execSync(cmd, { stdio: "inherit" });
    console.log(`[SIGN] ✓ PFX signed: ${path.basename(filePath)}`);
    return;
  }

  // Method 3: Azure Trusted Signing
  if (process.env.AZURE_SIGN_ENDPOINT) {
    console.log(`[SIGN] Using Azure Trusted Signing for: ${path.basename(filePath)}`);
    const cmd = [
      `"${signtool}"`, "sign",
      "/tr", timestampServerRFC3161,
      "/td", hash,
      "/fd", hash,
      "/dlib", "Microsoft.Trusted.Signing.Client\\bin\\x64\\Azure.CodeSigning.Dlib.dll",
      "/dmdf", "scripts/azure-sign-metadata.json",
      `"${filePath}"`,
    ].join(" ");

    execSync(cmd, { stdio: "inherit" });
    console.log(`[SIGN] ✓ Azure signed: ${path.basename(filePath)}`);
    return;
  }

  console.warn(`[SIGN] ⚠ No signing credentials found. Skipping code signing.`);
  console.warn(`[SIGN]   Set CSC_LINK + CSC_KEY_PASSWORD for PFX signing`);
  console.warn(`[SIGN]   Set EV_CERT_THUMBPRINT for EV signing`);
  console.warn(`[SIGN]   Set AZURE_SIGN_ENDPOINT for Azure Trusted Signing`);
};
