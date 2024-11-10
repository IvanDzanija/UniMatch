import csv
def main():
	# fileName = input("Input file: ")
	# outputName = input("Output file: ")
	fileName = "university_ranking.txt"
	outputName = "university_ranking.csv"
	file = open(fileName, "r")

	cont = file.read().split("\n")
	map = {}
	counts = {}
	for i in cont:
		print(i)
		if i == "":
			continue
		#i = i.replace("\t", ',')
		i = i.replace(", ", ',')
		split = i.split('\t')
		country = split[1].split(',')[1]
		if country in map:
			map[country] += float(split[2])
			counts[country] += int(1)
		else:
			map[country] =  float(split[2])
			counts[country] = int(1)


	corrected = []
	for r in map.keys():
		app = [r ,map[r] / counts[r]]
		print(app)
		corrected.append(app)
	with open(outputName, 'w', newline='') as file:
		writer = csv.writer(file)
		writer.writerows(corrected)
	return 0

if __name__ == "__main__":
	main()
