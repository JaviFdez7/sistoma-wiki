import Link from 'next/link';
import {Orbit,ArrowLeft} from 'lucide-react';
export default function NotFound(){return <div className="page-wrap empty not-found"><Orbit size={70}/><p className="eyebrow">SEÑAL NO ENCONTRADA / 404</p><h1>Fuera de la carta estelar.</h1><p>Esta entrada no existe en el archivo. Vuelve a la wiki para encontrar tu destino.</p><Link className="button primary" href="/"><ArrowLeft size={15}/> VOLVER AL ARCHIVO</Link></div>}
