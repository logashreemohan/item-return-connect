@echo off
REM Build script for Recycle Bin Sorter - Windows

echo ====================================
echo Building Recycle Bin Sorter
echo ====================================
echo.

REM Check if CATALINA_HOME is set
if "%CATALINA_HOME%"=="" (
    echo ERROR: CATALINA_HOME environment variable is not set.
    echo Please set CATALINA_HOME to your Tomcat installation directory.
    echo Example: set CATALINA_HOME=C:\apache-tomcat-9.0.xx
    pause
    exit /b 1
)

echo Tomcat Home: %CATALINA_HOME%
echo.

REM Create classes directory
echo Creating WEB-INF\classes directory...
if not exist "WEB-INF\classes" mkdir "WEB-INF\classes"
if not exist "WEB-INF\classes\com\recycle\servlet" mkdir "WEB-INF\classes\com\recycle\servlet"

REM Compile Java files
echo.
echo Compiling Java files...
javac -d WEB-INF\classes -cp "%CATALINA_HOME%\lib\servlet-api.jar" src\com\recycle\servlet\*.java

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Compilation failed!
    pause
    exit /b 1
)

echo.
echo ====================================
echo Build completed successfully!
echo ====================================
echo.
echo To deploy the application:
echo 1. Copy this entire folder to %CATALINA_HOME%\webapps\
echo 2. Or create a WAR file and deploy it
echo.
echo To create a WAR file, run: create-war.bat
echo.
pause
