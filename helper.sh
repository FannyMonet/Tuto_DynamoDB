export AWS_DEFAULT_REGION=localhost
export DYNAMO_URL=http://localhost:8000

tables=`aws dynamodb list-tables --endpoint $DYNAMO_URL \
  | jq .TableNames[] \
  | sed 's/"//g' \
  | xargs`

for table in $tables
do
  fields=`aws dynamodb scan --table-name $table --endpoint $DYNAMO_URL \
    | jq '.Items[] | "\(keys[])"' \
    | sed 's/"//g' \
    | sort -u \
    | xargs`

  echo "+---------------------------+"
  printf "%s%-25.25s%s" "| " $table " |"
  echo
  echo "+---------------------------+"

  for field in $fields
  do
    printf "%s%-25.25s%s" "| " $field " |"
    echo
  done

  echo "+---------------------------+"
  echo
done
