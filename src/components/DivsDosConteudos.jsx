

export default function DivsDosConteudos({ children }) {
    return (
        <div 
        className="container p-4 rounded mt-2"
        style={{background:"linear-gradient(to right top, var(--gray-20),var(--gray-70))"}}>
            {children}
        </div>

    )
}