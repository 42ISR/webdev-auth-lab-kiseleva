import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from './Input'
import { api } from '../api/api'
import { useItemStore } from '../store/useItemStore'
import { getErrorMessage } from '../utils/getErrorMessage'

const CreateItem = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const getItems = useItemStore((state) => state.getItems)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const item = {
            title: e.target.title.value,
            description: e.target.description.value,
            price: Number(e.target.price.value), // из формы приходит строка, серверу нужно число
        }
        if (e.target.imageUrl.value) item.imageUrl = e.target.imageUrl.value

        try {
            await api.sendItems(item)
            await getItems()
            navigate('/')
        } catch (err) {
            console.error(err)
            setError(getErrorMessage(err))
        }
    }

    return (
        <div className="container">
            <div className="page-header">
                <h1>Создать новый товар</h1>
            </div>

            <div className="form-container">
                {error && <div className="alert alert-error active">{error}</div>}

                <form id="create-item-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            Название товара <span className="required">*</span>
                        </label>
                        <Input
                            type="text"
                            className="form-input"
                            name="title"
                            placeholder="Например: iPhone 14 Pro 256GB"
                            maxLength="100"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Описание <span className="required">*</span>
                        </label>
                        <textarea
                            className="form-textarea"
                            name="description"
                            placeholder="Подробно опишите товар, его состояние, характеристики..."
                            maxLength="1000"
                            required></textarea>
                        <div className="form-hint">
                            Чем подробнее описание, тем больше шансов продать
                            товар
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Начальная цена <span className="required">*</span>
                        </label>
                        <div className="input-group">
                            <Input
                                type="number"
                                className="form-input with-prefix"
                                name="price"
                                placeholder="5000"
                                min="1"
                                step="100"
                                required
                            />
                            <span className="input-prefix">₽</span>
                        </div>
                        <div className="form-hint">
                            Укажите минимальную цену, с которой начнутся торги
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">URL изображения</label>
                        <Input
                            type="url"
                            className="form-input"
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg"
                        />
                        <div className="form-hint">
                            Вставьте ссылку на изображение товара (опционально)
                        </div>
                    </div>

                    <div className="form-actions">
                        <Link to="/" className="btn-cancel">
                            Отмена
                        </Link>
                        <button type="submit" className="btn-submit">
                            Создать товар
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateItem
