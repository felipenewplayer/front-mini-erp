import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
export default function ComponenteGrafico({ titulo, dados, color }) {
    return (
        <div className="pb-3" style={{ height: 300 }}>
            <h4
            style={{color}}>{titulo}</h4>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dados}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" stroke="#fff" tick={{ fill: "#fff" }} />
                    <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
                    <Tooltip />
                    <Bar dataKey="quantidade" fill="#23222f" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}