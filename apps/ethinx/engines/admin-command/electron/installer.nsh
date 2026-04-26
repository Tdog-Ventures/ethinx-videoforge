; ETHINX NSIS Custom Include
; Used by electron-builder for advanced installer customization

!include "MUI2.nsh"
!include "FileFunc.nsh"

; Custom macros
!macro customInit
  ; Check if already running
  System::Call 'kernel32::CreateMutex(i 0, i 0, t "ETHINX_MUTEX") ?e'
  Pop $R0
  ${If} $R0 != 0
    MessageBox MB_OK|MB_ICONEXCLAMATION "ETHINX is already running. Please close it before installing."
    Abort
  ${EndIf}
!macroend

!macro customInstall
  ; Create data directory
  CreateDirectory "$INSTDIR\data"
  
  ; Set permissions
  AccessControl::GrantOnFile "$INSTDIR\data" "(S-1-5-32-545)" "FullAccess"
  
  ; Register protocol handler
  WriteRegStr HKCU "Software\Classes\ethinx" "" "URL:ETHINX Protocol"
  WriteRegStr HKCU "Software\Classes\ethinx" "URL Protocol" ""
  WriteRegStr HKCU "Software\Classes\ethinx\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME},0"
  WriteRegStr HKCU "Software\Classes\ethinx\shell\open\command" "" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}" "%1"'
!macroend

!macro customUnInstall
  ; Clean up registry
  DeleteRegKey HKCU "Software\Classes\ethinx"
  DeleteRegKey HKCU "Software\ETHINX"
  
  ; Remove app data (ask user)
  MessageBox MB_YESNO|MB_ICONQUESTION "Do you want to remove all ETHINX data and settings?" IDNO +2
  RMDir /r "$APPDATA\ETHINX"
!macroend

!macro customHeader
  ; Custom header bitmap
  !insertmacro MUI_HEADER_TEXT "Install ETHINX" "Executive Command Portal"
!macroend

; Welcome page customization
!define MUI_WELCOMEFINISHPAGE_BITMAP "installer-sidebar.bmp"
!define MUI_WELCOMEPAGE_TITLE "Welcome to ETHINX Setup"
!define MUI_WELCOMEPAGE_TEXT "This wizard will guide you through the installation of ETHINX Executive Command Portal.$\r$\n$\r$\nFeatures:$\r$\n• Secure authentication$\r$\n• Real-time dashboard$\r$\n• Enterprise security$\r$\n$\r$\nClick Next to continue."

; Finish page customization  
!define MUI_FINISHPAGE_RUN "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
!define MUI_FINISHPAGE_RUN_TEXT "Launch ETHINX"
!define MUI_FINISHPAGE_SHOWREADME ""
!define MUI_FINISHPAGE_SHOWREADME_NOTCHECKED
!define MUI_FINISHPAGE_SHOWREADME_TEXT "Create Desktop Shortcut"
!define MUI_FINISHPAGE_SHOWREADME_FUNCTION CreateDesktopShortcut

Function CreateDesktopShortcut
  CreateShortCut "$DESKTOP\ETHINX.lnk" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
FunctionEnd
