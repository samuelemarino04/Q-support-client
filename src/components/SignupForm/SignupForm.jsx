const SignupForm = () => {

    const [singupData, setSignupData] = useState({
        username: '',
        birth: '',
        role: '', //duda, aqui como hacemos para que el user elija entre Client y Creative?
        email: '',
        password: '',
    })

    const navigate = useNavigate()



    return (
        <h1>hey</h1>
    )
}

export default SignupForm