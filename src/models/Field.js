class Field {
    constructor(position) {
        this.position = position
        this.selected = false
        this.sign = null
    }

    setSelected() {
        this.selected = true
    }

    setSign(sign) {
        this.sign = sign
    }

}

export default Field