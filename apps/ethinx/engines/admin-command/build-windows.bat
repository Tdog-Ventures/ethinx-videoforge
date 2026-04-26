@echo off
:: ETHINX Windows Build Script
:: Builds the Windows installer (.exe)

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   ETHINX Windows Installer Builder
echo ========================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

:: Check Node version
for /f "tokens=1" %%i in ('node -v') do set NODE_VER=%%i
echo [INFO] Node.js version: %NODE_VER%

:: Check for npm
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] npm is not installed.
    pause
    exit /b 1
)

:: Navigate to project directory
cd /d "%~dp0"

echo.
echo [STEP 1/5] Installing dependencies...
echo.
call npm install
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [STEP 2/5] Installing Electron dependencies...
echo.
cd electron
call npm install
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to install Electron dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [STEP 3/5] Building web application...
echo.
call npm run build
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to build web application
    pause
    exit /b 1
)

:: Check for code signing certificate
if defined CSC_LINK (
    echo [INFO] Code signing certificate detected - builds will be signed
) else if defined EV_CERT_THUMBPRINT (
    echo [INFO] EV certificate thumbprint detected - builds will be signed
) else (
    echo [WARN] No code signing certificate configured. Installer will NOT be signed.
    echo [WARN] Set CSC_LINK + CSC_KEY_PASSWORD or EV_CERT_THUMBPRINT to enable signing.
)

echo.
echo [STEP 4/5] Creating Windows installer...
echo.
cd electron
call npm run build:win
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to create Windows installer
    pause
    exit /b 1
)
cd ..

echo.
echo [STEP 5/5] Build complete!
echo.
echo ========================================
echo   Build Successful!
echo ========================================
echo.
echo Installer location: electron\release\
echo.
echo Files created:
dir /b electron\release\*.exe 2>nul
echo.

:: Open release folder
explorer electron\release

pause
