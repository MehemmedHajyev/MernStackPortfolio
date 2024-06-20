class Experience {
    constructor({name, startDate, endDate, imageUrl, position}) {
        this.name = name
        this.startDate = new Date(startDate)
        if (isNaN(this.startDate)) {
            throw new Error("Invalid startDate format. Expected format: YYYY-MM-DD")
        }
        this.endDate = new Date(endDate)
        this.imageUrl = imageUrl
        this.position = position
    }
}

module.exports = Experience