import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const roleToAssumeARN = config.require("roleToAssumeARN");

const provider = new aws.Provider("privileged", {
    assumeRole: {
        roleArn: roleToAssumeARN,
        sessionName: "PulumiSession",
        externalId: "PulumiApplication",
    },
    region: aws.config.requireRegion(),
});

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket", {}, {provider: provider});

// Export the DNS name of the bucket
export const bucketName = bucket.bucketDomainName;
