## deployment

initial setup on first time

```
$ az group create -l centralus -n functions-test
$ az storage account create -n ssogpimage -l centralus -g functions-test --sku Standard_LRS
$ az functionapp create -n ss-ogp-image --storage-account ssogpimage \
    --consumption-plan-location centralus -g functions-test \
    --functions-version 3 --runtime custom --os-type Linux
```

deploy

```
$ denofunc publish ss-ogp-image
```

## on local env

```
$ denofunc start
```
