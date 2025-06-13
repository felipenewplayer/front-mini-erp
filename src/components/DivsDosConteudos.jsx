import "../index.css"

export default function DivsDosConteudos({ children, title}) {
    return (
        <div
            className=" container p-4 rounded mt-2 container_dos_conteudos shadow mb-5"
            style={{
                background: "linear-gradient(to right top, var(--gray-20),var(--gray-70))",
                maxWidth: "900px"
            }}>
            <h1 className="text-light mb-4 ms-4 text-start">{title}</h1>
            {children}
        </div>

    )
}