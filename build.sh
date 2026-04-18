#!/bin/bash
# Build script for Recycle Bin Sorter - Linux/Mac

echo "===================================="
echo "Building Recycle Bin Sorter"
echo "===================================="
echo

# Check if CATALINA_HOME is set
if [ -z "$CATALINA_HOME" ]; then
    echo "ERROR: CATALINA_HOME environment variable is not set."
    echo "Please set CATALINA_HOME to your Tomcat installation directory."
    echo "Example: export CATALINA_HOME=/usr/local/tomcat"
    exit 1
fi

echo "Tomcat Home: $CATALINA_HOME"
echo

# Create classes directory
echo "Creating WEB-INF/classes directory..."
mkdir -p WEB-INF/classes/com/recycle/servlet

# Compile Java files
echo
echo "Compiling Java files..."
javac -d WEB-INF/classes -cp "$CATALINA_HOME/lib/servlet-api.jar" src/com/recycle/servlet/*.java

if [ $? -ne 0 ]; then
    echo
    echo "ERROR: Compilation failed!"
    exit 1
fi

echo
echo "===================================="
echo "Build completed successfully!"
echo "===================================="
echo
echo "To deploy the application:"
echo "1. Copy this entire folder to $CATALINA_HOME/webapps/"
echo "2. Or create a WAR file and deploy it"
echo
echo "To create a WAR file, run: ./create-war.sh"
echo
