import { useState } from 'react';
import Controls from './components/Controls';
import RainCanvas from './components/RainCanvas';
const presets = { baixa: { max: 150, rate: 60 }, media: { max: 450, rate: 220 }, alta: { max: 1200, rate: 750 } };
export default function App() {
 const [preset, setPreset] = useState('media'); const [wind, setWind] = useState(0); const settings = { ...presets[preset], wind };
 return <main className="container py-5"><header className="mb-4"><span className="badge text-bg-primary mb-3">COMPUTAÇÃO GRÁFICA · AULA 11</span><h1 className="display-5 fw-bold">Laboratório de chuva</h1><p className="lead text-secondary">Explore emissão, movimento e tempo de vida em um sistema de partículas.</p></header><div className="row g-4"><div className="col-lg-8"><div className="scene"><div className="scene-label">CENA DE SIMULAÇÃO <span>· {settings.rate} gotas/s · máximo {settings.max}</span></div><div className="moon"/><div className="horizon"/><RainCanvas settings={settings}/></div><p className="small text-secondary mt-2">Representação em Canvas 2D, adaptável como protótipo para uma cena 3D.</p></div><div className="col-lg-4"><Controls {...{preset,setPreset,wind,setWind}}/><div className="card border-0 mt-3"><div className="card-body"><h2 className="h6">Como funciona</h2><p className="small mb-0">O emissor distribui gotas no topo. A gravidade acelera a queda e o vento altera a direção. As gotas são removidas ao sair da cena ou atingir o tempo de vida.</p></div></div></div></div></main>;
}
