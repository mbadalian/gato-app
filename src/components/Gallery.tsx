import React from 'react';

interface Props {
    cats: any[]; // FIXme
    view: 'grid' | 'list'; // grid | pinterest
}

export const Gallery: React.FC<Props> = ({ cats, view }) => {
    // TODO: клик по картинке делает галерейку
    // TODO: onLoad собственный скелетон
    return (
        <div className={`${view}-gallery`}>
            {cats.map((cat) => (
                <img key={cat.id} src={cat.url} alt="Cute cat" />
            ))}
        </div>
    )
}