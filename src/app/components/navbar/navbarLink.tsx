
const NavbarLink = ({ active, rute, text }: { active: boolean, text: string, rute: string }) => {
    return (
        <>
            {active
                ?
                <a
                    href={rute}
                    className="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-slate-100 hover:border-slate-100"
                >
                    <i className="fas fa-link pr-0 md:pr-3" />
                    <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-100 block md:inline-block">
                        {text}
                    </span>
                </a>
                :
                <a
                    href={rute}
                    className="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-slate-100 border-b-2 border-slate-100 md:border-gray-900 hover:border-slate-100"
                >
                    <i className="fas fa-link pr-0 md:pr-3" />
                    <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-100 block md:inline-block">
                        {text}
                    </span>
                </a>

            }

        </>


    )
}

export default NavbarLink