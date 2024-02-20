import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Checkbox, Col, Row, TimePicker, message } from 'antd';
import axios from 'axios';

const GerenciamentoHorarios: React.FC = () => {
    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(dayjs().hour(0).minute(0));
    const format = 'HH:mm';

    const toggleDaySelection = (day: number) => {
        const updatedSelectedDays = selectedDays.includes(day)
            ? selectedDays.filter(selectedDay => selectedDay !== day)
            : [...selectedDays, day];
        setSelectedDays(updatedSelectedDays);
    };

    const salvarHorarios = async () => {
        if (!selectedTime || selectedDays.length === 0) {
            message.error('Selecione um horário e pelo menos um dia da semana.');
            return;
        }
    
        const novoHorario = selectedTime.format(format);
        console.log('Horário a ser enviado:', novoHorario); // Adicionando um log para verificar o horário antes de enviar para o servidor
        try {
            const response = await axios.post('http://localhost:8000/adicionar-horario', { novoHorario, diasSemana: selectedDays });
            message.success('Horários adicionados com sucesso');
            console.log('Horário adicionado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao adicionar horário:', error);
            message.error('Erro ao adicionar horário');
        }
    };

    return (
        <div>
            <label htmlFor="horarios">Disponibilizar Horários: </label>
            <TimePicker
                value={selectedTime}
                format={format}
                onChange={(time) => setSelectedTime(time)}
            />
            <div>
                <h2>Selecione os dias da semana:</h2>
                <Checkbox.Group style={{ width: '100%', marginTop: '30px' }} value={selectedDays} onChange={setSelectedDays}>
                    <Row>
                        {[0, 1, 2, 3, 4, 5, 6].map(day => (
                            <Col span={8} key={day}>
                                <Checkbox value={day} onChange={() => toggleDaySelection(day)}>
                                    {day === 0 ? 'DOMINGO' : day === 1 ? 'SEGUNDA' : day === 2 ? 'TERÇA' : day === 3 ? 'QUARTA' : day === 4 ? 'QUINTA' : day === 5 ? 'SEXTA' : 'SÁBADO'}
                                </Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            </div>
            <button style={{ margin: '35px', marginLeft: '13%' }} onClick={salvarHorarios}>Salvar Horários</button>
        </div>
    );
};

export default GerenciamentoHorarios;
