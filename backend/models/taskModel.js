function Task(data) {
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
    };
}

module.exports = Task;