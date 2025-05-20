import GenericList from "../listsTemplates/GenericList";

const TrailerList = ({ list, onClickEdit, onClickDelete }) => {
    const columns = [
        { key: 'name', title: 'Модель' },
        { key: 'trailerNumber', title: 'Номер' },
        { key: 'liftingCapacity', title: 'Грузоподъемность (т)' },
        { key: 'length', title: 'Длина (м)', hideOnMobile: true },
        { key: 'width', title: 'Ширина (м)', hideOnMobile: true },
        { key: 'height', title: 'Высота (м)', hideOnMobile: true },
    ];

    const getItemProps = (item) => ({
        fields: [
            { key: 'name', value: item.name },
            { key: 'trailerNumber', value: item.trailerNumber },
            { key: 'liftingCapacity', value: item.liftingCapacity },
            { key: 'length', value: item.length, hideOnMobile: true },
            { key: 'width', value: item.width, hideOnMobile: true },
            { key: 'height', value: item.height, hideOnMobile: true },
        ],
        buttons: [
            { label: 'Редактировать', onClick: () => onClickEdit(item) },
            { label: 'Удалить', onClick: () => onClickDelete(item) },
        ]
    });

    return (
        <GenericList
            list={list}
            columns={columns}
            getItemProps={getItemProps}
        />
    );
};

export default TrailerList;