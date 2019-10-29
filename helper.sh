export AWS_DEFAULT_REGION=localhost
export DYNAMO_URL=http://localhost:8000

tables=`aws dynamodb list-tables --endpoint $DYNAMO_URL \
  | jq .TableNames[] \
  | sed 's/"//g' \
  | xargs`

for table in $tables
do
  keys=`aws dynamodb describe-table --table-name $table --endpoint $DYNAMO_URL \
    | jq '.Table.KeySchema[] | "\(.KeyType[0:1]):\(.AttributeName)"' \
    | sed 's/"//g' \
    | sort -u \
    | xargs`

  fields=`aws dynamodb scan --table-name $table --endpoint $DYNAMO_URL \
    | jq '.Items[] | "\(keys[])"' \
    | sed 's/"//g' \
    | sort -u \
    | xargs`

  echo "+------------------------------------------+"
  printf "%s%-40.40s%s" "| " "$table ($keys)" " |"
  echo
  echo "+------------------------------------------+"

  for field in $fields
  do
    printf "%s%-40.40s%s" "| " $field " |"
    echo
  done

  echo "+------------------------------------------+"
  echo
done
