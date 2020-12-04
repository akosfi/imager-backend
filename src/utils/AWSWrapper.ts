import { S3 } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const S3ServiceObject = new S3();

export const S3BucketParams = {
    Bucket: "akosfi",
    CreateBucketConfiguration: { LocationConstraint: "eu-west-3" }
};

export const S3BucketUploadFolder = "uploads/";

(async function initS3Bucket() {    
    try {
        const buckets = await S3ServiceObject.listBuckets().promise();
        const bucket = buckets.Buckets.find(({ Name }) => Name === S3BucketParams.Bucket);

        if(!bucket) throw new Error("Bucket not found.");
        
    } catch (err) {
        if (err && err.stack) return console.log(err, err.stack);
        return console.log(err);
    }    
})();

export const uploadImageToS3 = async (file: Buffer, ext: string): Promise<string> => {
    const fileKey = `${S3BucketUploadFolder}${uuidv4()}${ext}`;
    const params = {
        Bucket: S3BucketParams.Bucket,
        Key: fileKey,
        Body: file,
        ACL: "public-read"
    };
    await S3ServiceObject.upload(params).promise();
    return `https://${S3BucketParams.Bucket}.s3.${S3BucketParams.CreateBucketConfiguration.LocationConstraint}.amazonaws.com/${fileKey}`
}   