const Navbar = () => {
    return (
        <>
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <a href="/home" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <span className="fs-4">Noodle soup</span>
                    </a>

                    <ul className="nav nav-pills">
                        <li className="nav-item"><a href="/home" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/dashboard" className="nav-link">Dashboard</a></li>
                    </ul>
                </header>
            </div>
        </>
    )
}

export default Navbar