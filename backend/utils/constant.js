const DATABASE_KEYS = Object.freeze({
    SERVICES: "services",
    SKILLS: "skills",
    EXPERIENCES: "experiences",
    MESSAGES: "messages",
    PORTFOLIOS: "portfolios",
})

const OPERATION_MESSAGES = Object.freeze({
    ADDED: "Data Successfully Added",
    UPDATE: "Data Successfully Updated",
    DELETE: "Data Successfully Deleted",
})

const COMMON_VALIDATION_MESSAGES = Object.freeze({
    notNull: (field) => `${field} cannot be null`,
    length: (field, min, max) => `${field} must be between ${min} and ${max} chars`
})

const CONTENT_TYPES = Object.freeze({
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.txt': 'text/plain'
});

module.exports = {
    DATABASE_KEYS,
    OPERATION_MESSAGES,
    CONTENT_TYPES,
    COMMON_VALIDATION_MESSAGES
}