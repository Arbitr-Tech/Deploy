import GenericList from "../listsTemplates/GenericList";

const DriverList = ({ list, onClickEdit, onClickDelete }) => {
    const columns = [
        { key: 'fullName', title: 'ФИО' },
        { key: 'licenseCategory', title: 'Категория ВУ' },
        { key: 'licenseNumber', title: 'Номер ВУ' },
        { key: 'issueDate', title: 'Дата выдачи ВУ' },
        { key: 'expirationDate', title: 'Срок окончания', hideOnMobile: true },
    ];

    const getItemProps = (item) => ({
        fields: [
            { key: 'fullName', value: item.fullName },
            { key: 'licenseCategory', value: item.licenseCategory },
            { key: 'licenseNumber', value: item.licenseNumber },
            { key: 'issueDate', value: item.issueDate },
            { key: 'expirationDate', value: item.expirationDate, hideOnMobile: true },
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
            headerClassName="genericList__result-header--driver"
            itemClassName="genericList__item-text--driver"
        />
    );
};

export default DriverList;