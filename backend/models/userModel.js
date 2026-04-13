function User(data) {
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
    };
}

module.exports = User;