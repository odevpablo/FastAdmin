import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HorariosDisponiveisComponent: React.FC = () => {
  // Definir o estado para armazenar os horários disponíveis
  const [horarios, setHorarios] = useState<any[]>([]);

  // Função para converter números de dias da semana em strings
  const numeroParaDiaDaSemana = (numero: number) => {
    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return diasDaSemana[numero];
  };

  // Função para formatar o horário
  const formatarHorario = (horario: Date) => {
    try {
      const formattedHorario = new Date(horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      console.log('Horário formatado:', formattedHorario);
      return formattedHorario;
    } catch (error) {
      console.error('Erro ao formatar o horário:', error);
      return 'Horário inválido';
    }
  };

  const fetchHorarios = async () => {
    try {
      // Fazer a solicitação GET para a rota /horarios-disponiveis
      const response = await axios.get('http://localhost:8000/horarios-disponiveis');
      // Converter números de dias da semana para strings e formatar o horário
      const horariosConvertidos = response.data.horarios.map((horario: any) => ({
        ...horario,
        diasSemana: numeroParaDiaDaSemana(horario.diasSemana),
        horario: formatarHorario(new Date(horario.horario))
      }));
      // Atualizar o estado com os horários disponíveis recuperados
      setHorarios(horariosConvertidos);
    } catch (error) {
      // Lidar com erros caso ocorram
      console.error('Erro ao recuperar os horários disponíveis:', error);
    }
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  return (
    <div>
      <h2>Horários Disponíveis</h2>
      <ul>
        {horarios && horarios.map((horario, index) => (
          <li key={index}>
            <p>Horário: {horario.horario}</p>
            <p>Dias da Semana: {horario.diasSemana}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HorariosDisponiveisComponent;
