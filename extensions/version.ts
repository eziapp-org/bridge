type Platform = "windows" | "linux" | "macos" | "harmonyos" | "openharmony" | "android" | "ios";

type SemVer = `${number}.${number}.${number}`;

type EziVersion = {
    EziVersion: SemVer;
    BuildType: "Debug" | "Release";
    BuildDate: string;
    Platform: Platform;
    OSVersion: SemVer;
    EziGitHash: string;
    WebViewVersion: string;
}

class Version {
    /**
     * Ezi 注入的版本信息
     */
    private versionInfo = JSON.parse(JSON.stringify((window as any).Ezi)) as EziVersion;

    /**
     * 获得一份完整的版本报告文本
     */
    public getReport() {
        return `Ezi Version Report:
- Ezi Version: ${this.getEziVersion()}
- Build Type: ${this.getBuildType()}
- Git Hash: ${this.getGitHash()}
- Platform: ${this.getPlatform()}
- OS Version: ${this.getOSVersion()}
- WebView Version: ${this.getWebViewVersion()}
- Build Date: ${this.getBuildDate().toISOString()}
- Report Time: ${new Date().toISOString()}`;
    }

    /**
     * 返回 Ezi 的语义化版本号（SemVer）
     */
    public getEziVersion() {
        return this.versionInfo.EziVersion;
    }

    /**
     * 返回 Ezi 的构建类型
     */
    public getBuildType() {
        return this.versionInfo.BuildType;
    }

    /**
     * 返回 Ezi 的构建日期
     */
    public getBuildDate() {
        return new Date(this.versionInfo.BuildDate);
    }

    /**
     * 返回当前的运行平台
     */
    public getPlatform() {
        return this.versionInfo.Platform;
    }

    /**
     * 返回当前操作系统的语义化版本号（SemVer）
     */
    public getOSVersion() {
        return this.versionInfo.OSVersion;
    }
    /**
     * 返回当前使用的 WebView 的版本号
     */
    public getWebViewVersion() {
        return this.versionInfo.WebViewVersion;
    }

    /**
     * 返回 Ezi 编译版本所在的 Git 提交哈希值
     */
    public getGitHash() {
        return this.versionInfo.EziGitHash;
    }

    /**
     * 判断当前Ezi版本是否大于目标版本
     * @param target 目标版本
     */
    public isEziVersionGreaterThan(target: SemVer): boolean {
        const [a1, a2, a3] = this.getEziVersion().split(".").map(Number);
        const [b1, b2, b3] = target.split(".").map(Number);
        return a1 > b1 || (a1 === b1 && a2 > b2) || (a1 === b1 && a2 === b2 && a3 > b3);
    }

    /**
     * 判断当前操作系统版本是否大于目标版本
     * @param target 目标版本
     */
    public isOSVersionGreaterThan(target: SemVer): boolean {
        const [a1, a2, a3] = this.getOSVersion().split(".").map(Number);
        const [b1, b2, b3] = target.split(".").map(Number);
        return a1 > b1 || (a1 === b1 && a2 > b2) || (a1 === b1 && a2 === b2 && a3 > b3);
    }

    /**
     * 判断当前版本是否为调试模式
     */
    public isDebug() {
        return this.getBuildType() === "Debug";
    }

    /**
     * 判断当前版本是否为发布模式
     */
    public isRelease() {
        return this.getBuildType() === "Release";
    }

    /**
     * 判断当前运行平台是否为 Windows
     */
    public isWindows() {
        return this.getPlatform() === "windows";
    }

    /**
     * 判断当前运行平台是否为 Linux
     */
    public isLinux() {
        return this.getPlatform() === "linux";
    }

    /**
     * 判断当前运行平台是否为 MacOS
     */
    public isMacOS() {
        return this.getPlatform() === "macos";
    }

    /**
     * 判断当前运行平台是否为 HarmonyOS
     */
    public isHarmonyOS() {
        return this.getPlatform() === "harmonyos";
    }

    /**
     * 判断当前运行平台是否为 OpenHarmony
     */
    public isOpenHarmony() {
        return this.getPlatform() === "openharmony";
    }

    /**
     * 判断当前运行平台是否为 Android
     */
    public isAndroid() {
        return this.getPlatform() === "android";
    }

    /**
     * 判断当前运行平台是否为 iOS
     */
    public isIOS() {
        return this.getPlatform() === "ios";
    }

    /**
     * 判断当前系统是否为 Windows 11 或更高版本
     */
    public isWindows11OrHigher(): boolean {
        if (!this.isWindows()) return false;
        return this.isOSVersionGreaterThan("10.0.22000");
    }
}

export default new Version();