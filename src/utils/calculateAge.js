export const calculateAge = dateOfBirth => {
    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1
    }
    return age
}

export const isValidForSignup = dateOfBirth => {
    const age = calculateAge(dateOfBirth)
    return age >= 18
}