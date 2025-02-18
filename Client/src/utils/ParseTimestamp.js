function ParseTimestamp(timestamp) {
    if (timestamp) {
        const date = new Date(timestamp);
        const options = { day: "2-digit", month: "short", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-GB", options);
        return formattedDate;
    }
}


export default ParseTimestamp