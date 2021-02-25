
#readonly QUERY="(" -name '*.entity.ts'  -o -name "*.validator.ts" -o -name "*.middleware.ts" ")"
find ./src "(" -name '/index.ts' ")" | while read fname;
do
    echo $fname
done


# find ./src "(" -name '*.entity.ts'  -o -name "*.validator.ts" -o -name "*.middleware.ts" ")" | while read fname;
# do
#     VAR="$fname"
#     echo $fname
#     #echo "$(dirname "${VAR}")" ;
    
#      echo "$(basename "${VAR}")"
# done

# find ./ -type f "(" -name '*.entity.ts'  -o -name "*.validator.ts" -o -name "*.middleware.ts" ")" > out.txt 