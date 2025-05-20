import ItemCarrier from "./ItemCarrier";

const ListCarrier = ({ listCarrier = [], onClickSee, onClickAccept, onClickProfile }) => {
    return (
        <div className="listCarrier" >
            <h2 className="listCarrier__title">Отклики</h2>
            <div className="listCarrier__content">
                {listCarrier.map((item) => (
                    <ItemCarrier key={item.responderDetails.id}
                        name={item.responderDetails.profileName}
                        desc={item.responderDetails.userRating}
                        onClickSee={() => onClickSee(item)}
                        onClickAccept={() => onClickAccept(item)}
                        onClickProfile={() => onClickProfile(item)}
                    />
                ))}
            </div>

        </div >
    )
};

export default ListCarrier;