import React from "react";

import {
  LineItem,
  Maybe,
  Order,
  useGetOrdersQuery,
} from "../../../graphql/generated/generated";
import { useRouter } from "../../../lib/hooks/useRouter";
import { Image } from "../../shared/Image/Image";
import Button from "../../shared/Button/Button";
import { Table } from "../../Table/Table";

//styles
import "./ProfileOrdersTable.scss";

export const ProfileOrdersTable = () => {
  const { data, loading } = useGetOrdersQuery();
  const router = useRouter();
  const columns = [
    { key: "order", header: "Porosia" },
    { key: "products", header: "Produktet" },
    { key: "date", header: "Data" },
    { key: "status", header: "Statusi" },
    { key: "total", header: "Totali" },
    { key: "action", header: "" },
  ];

  const rows = data?.customer?.orders?.nodes?.map((order: Maybe<Order>) => {
    const formatedDate = new Date(`${order?.date}`).toLocaleString();
    const orderGallery = order?.lineItems?.nodes as LineItem[];
    const hasMoreImages = orderGallery.length > 2;
    const extraImages = hasMoreImages && orderGallery.length - 2;
    return {
      order: (
        <div className="ProfileOrdersTable__order">#{order?.orderNumber}</div>
      ),
      products: (
        <div
          className="ProfileOrdersTable__product"
          onClick={() => router.history.push(`/my-orders/${order?.databaseId}`)}
        >
          {orderGallery?.map((item, index) => {
            const productImageURL = encodeURI(
              `https://management.blejgoma.com/wp-content/uploads/photos/${item?.product?.productMetas?.model}.jpg`
            );
            if (index >= 2) {
              return null;
            }
            return (
              <div
                className="ProfileOrdersTable__image"
                key={`ProfileOrderImage--${index}`}
              >
                <Image src={productImageURL} alt="" />
              </div>
            );
          })}
          {hasMoreImages && (
            <div className="ProfileOrdersTable__more_images">
              + {extraImages}
            </div>
          )}
        </div>
      ),
      date: <div className="ProfileOrdersTable__date">{formatedDate}</div>,
      status: <div className="ProfileOrdersTable__status">{order?.status}</div>,
      total: <div className="ProfileOrdersTable__total">{order?.total}</div>,
      action: (
        <div className="ProfileOrdersTable__more">
          <Button
            label="MË SHUMË"
            size="sm"
            className="ProfileOrdersTable__more_btn"
            onClick={() =>
              router.history.push(`/my-orders/${order?.databaseId}`)
            }
          />
        </div>
      ),
    };
  });

  return (
    <div className="ProfileOrdersTable">
      <Table
        columns={columns}
        rows={rows}
        loading={loading}
        emptyPlaceholder="Nuk keni asnjë porosi"
        divideRow
      />
    </div>
  );
};
