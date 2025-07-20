import "../index.css"

export default function DivsDosConteudos({ children, title }) {
    return (
        <div
            className="container p-3 pt-5 rounded mt-5 container_dos_conteudos shadow mb-5">
            <h1 className="text-light mb-4 ms-4 text-start">{title}</h1>
            {children}
        </div>
    )
}