import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import entradaIcon from './assets/entradaIcon.png'
import saidaIcon from './assets/saidaIcon.png'
import cifrao from './assets/cifrao.png'

import './styles/style.css';
import { Table } from './components/Table';

function App() {

  const [entrada, setEntrada] = useState(0)
  const [saida, setSaida] = useState(0)
  const [saldo, setSaldo] = useState(0);

  const [id, setId] = useState(0)
  const [financa, setFinanca] = useState({id: 0, descricao:"", valor:0, tipo:""})
  const [dados, setDados] = useState([])

  const {register, handleSubmit, reset} = useForm()

  function atualizar(){
    var entradaAtualizada = 0;
    var saidaAtualizada = 0;
    var saldoAtualizado = 0;
    dados.map( (e) => {
      e.tipo === "entrada" ? entradaAtualizada+=Number(e.valor) : saidaAtualizada += Number(e.valor)
    })
    saldoAtualizado = entradaAtualizada-saidaAtualizada
    setEntrada(entradaAtualizada)
    setSaida(saidaAtualizada)
    setSaldo(saldoAtualizado)
  }

  function onSubmit (e){
    let controle = {
      id: id,
      descricao: e.descricao,
      valor: e.valor,
      tipo: e.tipo
    }
    setFinanca(controle)
    setId(id+1)
    reset()
  }

    const deleteItem = (id) => {
      var dadosFiltrados = dados.filter((e) => e.id !== id);
      setDados(dadosFiltrados);
      atualizar();
    }

  useEffect(()=>{
    setDados([...dados, financa])
  },[financa])

  useEffect(() => {
    atualizar()
  }, [dados])




  return (
    <main>
      <h1>Controle financeiro</h1>
      <div className='financeiro'>
        <div className='valores'>
            <span>
              Entrada
              <img src={entradaIcon} alt="entrada" width={20} height={20}/>
            </span>
            <h3>
              {`R$ ${entrada.toFixed(2)}`}
            </h3>
        </div>
        <div className='valores'>
            <span>
              Saida
              <img src={saidaIcon} alt="entrada" width={20} height={20}/>
            </span>
            <h3>
            {`R$ ${saida.toFixed(2)}`}
            </h3>
        </div>
        <div className='valores'>
        <span>
              Saldo
              <img src={cifrao} alt="entrada" width={20} height={20}/>
            </span>
            <h3>
            {`R$ ${saldo.toFixed(2)}`}
            </h3>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("descricao")} placeholder='Descrição' required />
        <input type="number" {...register("valor")} placeholder='valor' required/>
        <label htmlFor='entrada'>
           <input type="radio" {...register("tipo")} value={"entrada"} id="entrada" required/> Entrada
        </label>
        <label htmlFor='saida'>
           <input type="radio" {...register("tipo")} value={"saida"} id="saida" required/> Saida
        </label>
        <input type="submit" value="Cadastrar" />
      </form>
      <Table dados={dados} deleteItem={deleteItem}/>
    </main>
  )
}

export default App
