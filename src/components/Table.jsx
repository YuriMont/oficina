import '../styles/tableStyle.css';
import entradaIcon from '../assets/entradaIcon.png'
import saidaIcon from '../assets/saidaIcon.png'
import remover from'../assets/remover.png'

export function Table({dados, deleteItem}){

    return (
        <table cellSpacing={0}>
            <thead>
                <th>
                    Decrição
                </th>
                <th>
                    Valor
                </th>
                <th>
                    Tipo
                </th>
                <th></th>
            </thead>
            {
                dados.map( financa =>
                 (
                    financa.descricao != "" &&
                    <tr>
                        <td>{financa.descricao}</td>
                        <td>{`R$ ${financa.valor}`}</td>
                        <td>
                            {financa.tipo == "entrada" ? 
                            <img width={24} height={24} src={entradaIcon} alt="entrada" /> :
                            <img width={24} height={24} src={saidaIcon} alt="saida" />}
                        </td>
                        <td>
                            <button onClick={() => deleteItem(financa.id)}>
                                <img src={remover} alt="remover" />
                            </button>
                        </td>
                    </tr>   
                ))
            }
        </table>
    );
}