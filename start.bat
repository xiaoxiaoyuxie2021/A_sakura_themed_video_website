@echo off
REM 一键启动ECG项目（自动检测路径）

REM 获取当前bat文件所在目录
set "PROJECT_PATH=%~dp0"

REM 切换到项目目录
cd /d "%PROJECT_PATH%"

REM 启动服务器（后台运行）
start python -m http.server 8080

REM 打开浏览器
timeout /t 2 /nobreak > nul
start http://localhost:8080/index.html

exit
