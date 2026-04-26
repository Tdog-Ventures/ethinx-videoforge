; ETHINX Windows Installer Script
; Inno Setup Script (alternative to electron-builder NSIS)
; Download Inno Setup: https://jrsoftware.org/isinfo.php

#define MyAppName "ETHINX"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "ETHINX"
#define MyAppURL "https://ethinx.com"
#define MyAppExeName "ETHINX.exe"
#define MyAppAssocName "ETHINX Executive Portal"
#define MyAppAssocExt ".ethinx"
#define MyAppAssocKey StringChange(MyAppAssocName, " ", "") + MyAppAssocExt

[Setup]
; App information
AppId={{A1B2C3D4-E5F6-7890-ABCD-EF1234567890}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}/support
AppUpdatesURL={#MyAppURL}/updates
AppCopyright=Copyright © 2024 {#MyAppPublisher}

; Installer settings
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
AllowNoIcons=yes
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog
OutputDir=release
OutputBaseFilename=ETHINX-Setup-{#MyAppVersion}
SetupIconFile=electron\assets\icon.ico
UninstallDisplayIcon={app}\{#MyAppExeName}
Compression=lzma2/ultra64
SolidCompression=yes
WizardStyle=modern
WizardImageFile=electron\assets\installer-sidebar.bmp
WizardSmallImageFile=electron\assets\installer-header.bmp

; Visual settings
WindowVisible=yes
WindowShowCaption=yes
WindowResizable=no
BackColor=$000000
BackColor2=$1a1a1a

; Signing (uncomment and configure for production)
; SignTool=signtool sign /tr http://timestamp.digicert.com /td sha256 /fd sha256 /a $f

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1; Check: not IsAdminInstallMode
Name: "startupicon"; Description: "Start ETHINX when Windows starts"; GroupDescription: "Startup Options"

[Files]
; Main application files
Source: "release\win-unpacked\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; Additional files
Source: "LICENSE.txt"; DestDir: "{app}"; Flags: ignoreversion
Source: "README.md"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: quicklaunchicon
Name: "{userstartup}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: startupicon

[Registry]
; File associations
Root: HKA; Subkey: "Software\Classes\{#MyAppAssocExt}\OpenWithProgids"; ValueType: string; ValueName: "{#MyAppAssocKey}"; ValueData: ""; Flags: uninsdeletevalue
Root: HKA; Subkey: "Software\Classes\{#MyAppAssocKey}"; ValueType: string; ValueName: ""; ValueData: "{#MyAppAssocName}"; Flags: uninsdeletekey
Root: HKA; Subkey: "Software\Classes\{#MyAppAssocKey}\DefaultIcon"; ValueType: string; ValueName: ""; ValueData: "{app}\{#MyAppExeName},0"
Root: HKA; Subkey: "Software\Classes\{#MyAppAssocKey}\shell\open\command"; ValueType: string; ValueName: ""; ValueData: """{app}\{#MyAppExeName}"" ""%1"""

; App settings
Root: HKCU; Subkey: "Software\ETHINX"; ValueType: string; ValueName: "InstallPath"; ValueData: "{app}"; Flags: uninsdeletekey
Root: HKCU; Subkey: "Software\ETHINX"; ValueType: string; ValueName: "Version"; ValueData: "{#MyAppVersion}"

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}\data"
Type: filesandordirs; Name: "{app}\logs"
Type: filesandordirs; Name: "{userappdata}\ETHINX"

[Code]
// Custom installer logic

var
  DownloadPage: TDownloadWizardPage;

function IsDotNetInstalled: Boolean;
begin
  Result := RegKeyExists(HKLM, 'SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full');
end;

function IsVCRedistInstalled: Boolean;
begin
  Result := RegKeyExists(HKLM, 'SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x64') or
            RegKeyExists(HKLM, 'SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x86');
end;

function InitializeSetup: Boolean;
begin
  Result := True;
  
  // Check for prerequisites
  if not IsVCRedistInstalled then
  begin
    if MsgBox('Microsoft Visual C++ Redistributable is required. Would you like to download it?', 
              mbConfirmation, MB_YESNO) = IDYES then
    begin
      ShellExec('open', 'https://aka.ms/vs/17/release/vc_redist.x64.exe', '', '', SW_SHOW, ewNoWait, Result);
    end;
  end;
end;

procedure InitializeWizard;
begin
  // Custom wizard initialization
  WizardForm.WelcomeLabel1.Font.Color := $00D7FF; // Gold color
  WizardForm.WelcomeLabel2.Caption := 'This will install ETHINX Executive Command Portal on your computer.' + #13#10 + #13#10 +
    'Features:' + #13#10 +
    '• Secure executive dashboard' + #13#10 +
    '• Real-time metrics and analytics' + #13#10 +
    '• Enterprise-grade security' + #13#10 + #13#10 +
    'Click Next to continue.';
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
  begin
    // Post-installation tasks
    SaveStringToFile(ExpandConstant('{app}\install.log'), 
      'Installed: ' + GetDateTimeString('yyyy-mm-dd hh:nn:ss', '-', ':'), False);
  end;
end;
