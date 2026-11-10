import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import { api } from '../api/api'
import { useItemStore } from '../store/useItemStore'

const ItemsList = () => {
    const items = useItemStore((state) => state.items)
    const getItems = useItemStore((state) => state.getItems)
    const [stats, setStats] = useState(null)

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await api.getStats()
                setStats(data)
            } catch (err) {
                console.error(err)
            }
        }

        getItems()
        loadStats()
    }, [getItems])

    return (
        <div className="container">
            <div className="page-header">
                <h1>Все товары</h1>
            </div>
            <div className="stats">
                <div className="stat-item">
                    <span className="stat-value">{stats?.totalItems ?? 0}</span>
                    <span className="stat-label">Товаров</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{stats?.totalBids ?? 0}</span>
                    <span className="stat-label">Ставок</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{stats?.activeItems ?? 0}</span>
                    <span className="stat-label">Активных</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{stats?.averageItemPrice ?? 0}₽</span>
                    <span className="stat-label">Средняя цена</span>
                </div>
            </div>

            <div className="items-grid">
                {items.map((item) => (
                    <ItemCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

export default ItemsList
