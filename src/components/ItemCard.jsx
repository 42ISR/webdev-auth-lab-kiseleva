import { Link } from 'react-router-dom'

const ItemCard = ({
    id,
    title,
    description,
    price,
    imageUrl,
    username,
    status,
    highestBid,
    bidCount,
}) => {
    return (
        <Link to={`/item/${id}`} className="item-link">
            <div className="item-card">
                {imageUrl && <img src={imageUrl} className="item-image" alt={title} />}
                <div className="item-content">
                    <span className="status-badge status-active">
                        {status === 'active' ? 'Активное' : status}
                    </span>
                    <h3 className="item-title">{title}</h3>
                    <p className="item-description">{description}</p>
                    <div className="item-footer">
                        <div>
                            <div className="item-price">{price} ₽</div>
                            <div className="bid-info">
                                {highestBid ? `${highestBid} ₽` : 'ставок нет'}
                                <span className="bid-count">{bidCount ?? 0}</span>
                            </div>
                        </div>
                        <div className="item-meta">
                            <span className="item-seller">Продавец: {username}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ItemCard
