import { useSelector } from "react-redux";
import { BASE_URL } from "../../api/api";

function WhatsIncluded() {
  const { deal: dealDetail, loading } = useSelector(
    (state) => state.deal
  );

  if (loading || !dealDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold text-[#03081F] mb-6">
        What's Included
      </h2>

      {dealDetail.items?.length === 0 ? (
        <p className="text-gray-500">
          No Items Available
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {dealDetail.items.map((item) => (

            <div
              key={item.id}
              className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white"
            >

              <img
                src={
                  item.menu_item?.image
                    ? `${BASE_URL}${item.menu_item.image}`
                    : "https://via.placeholder.com/300x220?text=No+Image"
                }
                alt={item.menu_item?.name}
                className="w-full h-44 object-cover"
              />

              <div className="p-4">

                <h3 className="font-bold text-lg">
                  {item.menu_item?.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  Quantity : {item.quantity}
                </p>

                <p className="text-[#FC8A06] text-lg font-bold mt-3">
                  £{item.menu_item?.price}
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default WhatsIncluded;