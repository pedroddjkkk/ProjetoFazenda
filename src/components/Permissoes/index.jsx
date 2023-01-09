import { useEffect, useRef } from "react"
import fadeIn from "../../utils/fadeIn";

export default function Permissoes(){
  const fadeInRef = useRef(null);

  useEffect(() => {
    fadeIn(fadeInRef.current);
  }, []);

  return (
    <div ref={fadeInRef}></div>
  )
}