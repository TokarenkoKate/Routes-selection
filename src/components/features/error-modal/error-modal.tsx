import { Modal } from "antd"
import { useAppSelector } from "hooks/redux"
import { useEffect, useState } from "react"
import { getError } from "store/routes/selectors"

function ErrorModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const error = useAppSelector(getError)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (error) {
      setIsModalOpen(true)
    }
  }, [error])

  return (
    <Modal
      title="Произошла ошибка при загрузке данных"
      open={isModalOpen}
      onOk={handleOk}
      okText="Закрыть"
      closeIcon={null}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <p>Попробуйте повторить Ваши действия снова.</p>
    </Modal>
  )
}

export default ErrorModal
