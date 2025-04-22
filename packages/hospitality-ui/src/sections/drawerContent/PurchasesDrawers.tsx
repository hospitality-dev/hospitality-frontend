import { DrawerTypes } from "../../atoms";
import { Button } from "../../components";
import { Icons } from "../../enums";
import { useCreate } from "../../hooks";

const tempUrl =
  "https://suf.purs.gov.rs/v/?vl=A0tDUEZLUjdIS0NQRktSN0hgPAAAYDwAABwqeQQAAAAAAAABlkzUvogAAAAdc2gTrM7m8MXAVw5%2BAueGMiqCd7Lso9oMW85%2FL%2Bjj0thQcdWmPCjOh7VMVw1ebUBKIYFLsGOYBZpAcvA5RcBbYb1wbn0nMCAzin1ZM6zgGK%2FKg4CZFnLHe%2Bw6kIeRLL%2FoOSMQPgQo2wPSZXso3%2B8KIjKXue7iFjq3YQNEcGSekng1Yeouf%2BBbKp0qzwnR8%2Fany9X22dCbCMIv0HngtVlZtu8eqx%2BcqX%2FcNPYCLhd%2BlIKA6hwOjCtJt86S3TMr%2B%2Bn2fQ7i4eJUVR9E5tpXG6RQ%2B3RC%2F3Y2Xfn9at37ZPxCp6OpzchjFH9KTJ1EbO59As%2F5IiDxWVdM70Yx8ZrKG4OBk%2FVquN086gMW1ODjhqRrelpWAMyRqM7uKwHa3AQSFK5iQcJLo6z9%2F9gjQiF26IM4hiMjP%2B5yJsnXU0B%2F7jKmaVhgVyjeJegmqFHWFCXTLLGCUmRLIm1AcS9UrdqOgzxI8ZkAtI3Fd3r2WhJKOHLcOK7V%2BBv00UipV77VdLHqiO00%2FZ9JNwXWuvFsGxoxcdHGdpbprquKWVwPNCruGVRU7cUnTaTeMhfFxvJ7hiicQXg2Xr4Y44ZgsmIpA5%2BpWqAJUSm49gIKY3nGydfusMmm0yj1gJToMsZxmYK0YcYZYOjjv0de21TJe1v9wwB6UcOJocTklwwsI4s%2BvDJ7K00Eh86PU%2BrDMuKJ8jbzLwGzNQY%3D";

export function CreatePurchase({ data }: Pick<Extract<DrawerTypes, { type: "create_purchases" }>, "data">) {
  const { mutate } = useCreate<typeof data>("purchases");
  return (
    <div>
      <Button
        icon={Icons.add}
        label="Create"
        onClick={() => mutate({ value: { url: data.url || tempUrl } })}
        variant="success"
      />
    </div>
  );
}
