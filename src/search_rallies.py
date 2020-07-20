
import json

with open('./Badminton_data_14.json') as f:
  data = json.load(f)

# Output: {'name': 'Bob', 'languages': ['English', 'Fench']}
total_number_rallies = len(data)
print(total_number_rallies)

dict_rally_string_json= {}


for num_rally in range(total_number_rallies):
	string_shots=""
	rally_data = data[str(num_rally+1)]["shots"]
	print(rally_data)
	total_number_shots_in_rally = len(rally_data)
	print(total_number_shots_in_rally)
	for num_shot in range(total_number_shots_in_rally):
		shot_data= rally_data[str(num_shot+1)]
		shot_type= shot_data["shot_played"]
		b_or_f= shot_data["B_or_F"]
		print(shot_type,b_or_f)
		if(shot_type=="SE" and b_or_f=="F"):
			case="A"
		elif(shot_type=="SE" and b_or_f=="B"):
			case="B"
		elif(shot_type=="L" and b_or_f=="F"):
			case="C"
		elif(shot_type=="L" and b_or_f=="B"):
			case="D"
		elif(shot_type=="T" and b_or_f=="F"):
			case="E"
		elif(shot_type=="T" and b_or_f=="B"):
			case="F"
		elif(shot_type=="D" and b_or_f=="F"):
			case="G"
		elif(shot_type=="D" and b_or_f=="B"):
			case="H"
		elif(shot_type=="SM" and b_or_f=="F"):
			case="I"
		elif(shot_type=="SM" and b_or_f=="B"):
			case="J"
		print(case)
		string_shots =string_shots+case
		print(string_shots)
	dict_rally_string_json[str(num_rally+1)]=string_shots
	# print(string_shots)
print(dict_rally_string_json) 
out_file = open("Badminton_data_rally_string.json", "w") 
json.dump(dict_rally_string_json, out_file, indent = 4, sort_keys = False) 
out_file.close()