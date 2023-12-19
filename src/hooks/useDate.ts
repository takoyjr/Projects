import React, {useState, useEffect} from 'react';

export function useDate() {
    const [currentDate, setDate] = useState(new Date());

    useEffect(() => {
        // Обновляем текущую дату каждую секунду
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);
    
        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(interval);
    }, []);
    return {currentDate};
}