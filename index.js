const {app, BrowserWindow, protocol} = require('electron');
const child_process = require('child_process')
const path = require('path')
const isDev = require('electron-is-dev')


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(process.cwd(), '\\resources\\gym.png'), 
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });

    if (isDev) {
        let backend = child_process.spawn(
            `${__dirname.split('/dist')[0]}\\backend\\dist\\server\\server.exe`
        )
        win.loadURL('http://127.0.0.1:3000')
    }
    else {
        console.log(process.cwd())
        let execfile = child_process.execFile(
            `${path.join(process.cwd(), '\\resources\\backend\\dist\\server\\server.exe')}`,
            {
                windowsHide: false,     
            },
            (err, stdout, stderr) => {
                if(err) {
                    console.log(err)
                }
                if(stdout) {
                    console.log(stdout)
                }
                if(stderr) {
                    console.log(stderr)
                }
            }
        )
        win.loadFile(`${__dirname}/frontend/build/index.html`)
    }
    
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        child_process.exec('taskkill /f /t /im server.exe', (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
        app.quit()
    }
})

app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');