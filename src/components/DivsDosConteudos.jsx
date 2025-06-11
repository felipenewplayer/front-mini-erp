import "../index.css"

export default function DivsDosConteudos({ children }) {
    return (
        <div 
        className=" container p-4 rounded mt-2 container_dos_conteudos"
        style={{background:"linear-gradient(to right top, var(--gray-20),var(--gray-70))",
            maxWidth:"900px"
        }}>
            {children}
        </div>

    )
}