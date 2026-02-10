type HSL = [h: number, s: number, l: number]

export function genQiDesignSystemColorsV0(base: string, schema: "light" | "dark" = "light") {
    const [h, s, l] = hexToHsl(base)
    const light = [
        ...distribution(l, 100, 7, easeInOutQuad).reverse(),
        ...distribution(0, l, 4, easeInOutQuart).reverse().slice(1),
    ]
        .map((l) => [h, s, Number(l.toFixed(0))] as HSL)
        .map(hslToHex)
    const dark = [...distribution(0, l, 7, easeInOutQuad), ...distribution(l, 100, 4, easeInOutQuart).slice(1)]
        .map((d) => [h, s, Number(d.toFixed(0))] as HSL)
        .map(hslToHex)
    return (
        {
            light,
            dark,
        } as const
    )[schema]
}

function distribution(v: number, target: number, step: number, easing: (x: number) => number) {
    if (step <= 0) return []
    const result = []
    const delta = target - v
    for (let i = 1; i <= step; i++) {
        const t = i / step
        const easedT = easing(t)
        result.push(v + easedT * delta)
    }
    return result
}

function easeLinear(x: number) {
    return x
}

function easeInOutCubic(x: number) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

function easeInOutQuart(x: number) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
}

function easeInOutQuad(x: number) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}

function easeInOutSine(x: number) {
    return -(Math.cos(Math.PI * x) - 1) / 2
}

/**
 * 16进制颜色值转HSL颜色数组
 * @param {string} hex 16进制颜色值，支持格式：#fff、fff、#ffffff、ffffff
 * @returns {Array<number>} HSL数组 [h, s, l]，h(0-360)、s(0-100)、l(0-100)
 */
function hexToHsl(hex: string) {
    // 步骤1：预处理并验证16进制字符串
    let cleanHex = hex.replace(/^#/, "") // 去除开头的#号

    // 补全简写格式（如fff -> ffffff）
    if (cleanHex.length === 3) {
        cleanHex = cleanHex
            .split("")
            .map((char) => char + char)
            .join("")
    }

    // 验证格式是否合法（6位16进制字符）
    if (!/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
        throw new Error("无效的16进制颜色值，请传入正确格式（如#fff或#ffffff）")
    }

    // 步骤2：16进制转RGB（0-255）
    const r = parseInt(cleanHex.slice(0, 2), 16)
    const g = parseInt(cleanHex.slice(2, 4), 16)
    const b = parseInt(cleanHex.slice(4, 6), 16)

    // 步骤3：RGB归一化到0-1范围
    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255

    // 步骤4：计算RGB的最大值、最小值
    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)

    // 步骤5：初始化H、S、L
    let h = 0
    let s = 0
    let l = (max + min) / 2

    // 步骤6：计算H（色相）和S（饱和度）（当max !== min时，才有色彩饱和度）
    if (max !== min) {
        const delta = max - min

        // 计算饱和度S
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

        // 计算色相H
        switch (max) {
            case rNorm:
                h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)
                break
            case gNorm:
                h = (bNorm - rNorm) / delta + 2
                break
            case bNorm:
                h = (rNorm - gNorm) / delta + 4
                break
        }

        // 将H转换为0-360的角度值
        h = h * 60
    }

    // 步骤7：格式化结果，S、L转为0-100的数值，保留合理精度（可选，这里保留2位小数）
    const hFinal = Math.round(h) // 色相通常取整数
    const sFinal = Math.round(s * 100)
    const lFinal = Math.round(l * 100)

    // 返回HSL数组
    return [hFinal, sFinal, lFinal] as HSL
}

/**
 * 将 HSL 颜色数组转换为 16 进制颜色值
 * @param {number[]} hslArr - 格式为 [h, s, l] 的数组，h(0-360), s(0-100), l(0-100)
 * @returns {string} 16 进制颜色值，格式为 #RRGGBB
 */
function hslToHex(hslArr: [number, number, number]) {
    let [h = 0, s = 0, l = 0] = hslArr

    h = Math.max(0, Math.min(360, h))
    s = Math.max(0, Math.min(100, s)) / 100
    l = Math.max(0, Math.min(100, l)) / 100

    let r, g, b

    if (s === 0) {
        r = g = b = l
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q

        r = Math.max(0, Math.min(1, hue2rgb(p, q, h / 360 + 1 / 3)))
        g = Math.max(0, Math.min(1, hue2rgb(p, q, h / 360)))
        b = Math.max(0, Math.min(1, hue2rgb(p, q, h / 360 - 1 / 3)))
    }

    const toHex = (value: number) => {
        const intValue = Math.round(Math.max(0, Math.min(255, value * 255)))
        const hex = intValue.toString(16)
        return hex.padStart(2, "0")
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}
