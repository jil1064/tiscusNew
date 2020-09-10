import pandas as pd
from PIL import Image
from PIL import ImageEnhance

im = Image.open("test.png")
double_size = (im.size[0]*2, im.size[1]*2)
larger_im = im.resize(double_size)
larger_im = ImageEnhance.Sharpness(larger_im).enhance(2.0)
larger_im.save("enhance.png")


with open('tableResult6.txt', 'r') as file:
    a = file.read()
txt_vals = [b.split('\t') for b in a.split('\n') if b]

di_rows = []
course = []
reoc = []
start = []
end =[]
DIreoc = []
DIstart = []
DIend = []
FIdate = []
FIstart = []
FIend = []
courseReach = 0

# well I need this
def hasNumber(inputString):
    return any(char.isdigit() for char in inputString)


# Locate the rows with course titles
for i in range(len(txt_vals)):
    # Get the first segment of each row, target: course titles
    temp = txt_vals[i][0].split()
    # Check if it's long enough, avoid "index out of bound"
    if len(temp) > 1:
        # COGS is alpha, 107A has numbers
        if temp[0].isalpha() and hasNumber(temp[1]):
            title = temp[0] + ' ' + temp[1]
            course.append(title)
            # A new course is found (with/without the final of its former course)
            if courseReach == 0:
                courseReach = 1;
            else:
                FIstart.append("NaN")
                FIend.append("NaN")
                FIdate.append("NaN")
            # Get which rows to look at when dealing with DI(Discussion)
            di_rows.append(i+1)
            # In the end of this row there are days & time. First split the row into words.
            tempstr = ' '.join(txt_vals[i])
            templist = tempstr.split()
            for j in range(len(templist)):
                # 2:00p-3:20p is unique with '-', so I'll use this pattern to locate it
                tempa = templist[j].find('-')
                # some course description also have '-', so I make sure a number follows '-'
                if tempa > 0 and templist[j][tempa + 1].isnumeric():
                    tempb = templist[j]
                    start.append(tempb[:tempa])
                    end.append(tempb[tempa + 1:])
                    reoc.append(templist[j - 1])
        # Here we can deal with the rows with finals
        elif 'Final' in temp[0]:
            courseReach = 0
            # The idea is similar
            tempstrr = ' '.join(txt_vals[i])
            templistt = tempstrr.split()
            for j in range(len(templistt)):
                tempaa = templistt[j].find('-')
                # but "human-center" has '-' too, so I make sure a number follows '-'
                if tempaa > 0 and templistt[j][tempaa + 1].isnumeric():
                    tempbb = templistt[j]
                    FIstart.append(tempbb[:tempaa])
                    FIend.append(tempbb[tempaa + 1:])
                    FIdate.append(templistt[j - 1])

print(di_rows)
# Deal with DIs
for i in range(len(txt_vals)):
    if i in di_rows:
        # Need to change A0 to include B0 / C O(misrecog) ...
        # if txt_vals[i][0][:2] == "A0":
        if txt_vals[i][0][0].isalpha() and hasNumber(txt_vals[i][0][:3]):
            # The idea below is similar
            for j in range(len(txt_vals[i])):
                temp2 = txt_vals[i][j].find('-')
                if temp2 > 0 and txt_vals[i][j][temp2 + 1].isnumeric():
                    temp3 = txt_vals[i][j].split()
                    temp4 = temp3[0]
                    temp5 = temp4.find('-')
                    DIstart.append(temp4[:temp5])
                    DIend.append(temp4[temp5 + 1:])
                    DIreoc.append(txt_vals[i][j - 1])
        else:
            DIstart.append("NaN")
            DIend.append("NaN")
            DIreoc.append("NaN")

if len(DIstart) < len(course):
    DIstart.append("NaN")
    DIend.append("NaN")
    DIreoc.append("NaN")

if len(FIstart) < len(course):
    FIstart.append("NaN")
    FIend.append("NaN")
    FIdate.append("NaN")

# Fix reoc labels
def fixreoc(reocl):
    for i in range(len(reocl)):
        tempf = reocl[i]
        if "u" in tempf or "h" in tempf or "M" in tempf or "W" in tempf or "F" in tempf:
            if "/" in tempf:
                reocl[i] = "NaN"
            elif len(tempf) == 3 and (not "u" in tempf or "h" in tempf):
                reocl[i] = "MWF"
            elif len(tempf) == 4 and (not "M" in tempf or "F" in tempf):
                reocl[i] = "TuTh"
            elif ("u" in tempf) and len(tempf) == 2:
                reocl[i] = "Tu"
            elif ("h" in tempf) and len(tempf) == 2:
                reocl[i] = "Th"
        else:
            reocl[i] = "NaN"

fixreoc(reoc)
fixreoc(DIreoc)

def fixtime(time):
    for i in range(len(time)):
        if time[i] != "NaN":
            tempf = ''.join(filter(lambda i: i.isdigit(), time[i]))
            if int(tempf[-2:]) > 60:
                tempf = tempf[:-1]
            m = str(tempf[-2:])
            if len(tempf) == 4:
                h = str(tempf[:2])
            else:
                h = str(tempf[0])
            if "a" in time[i]:
                time[i] = h + ':' + m + 'a'
            else:
                time[i] = h + ':' + m + 'p'

for i in start, end, DIstart, DIend, FIstart, FIend:
    fixtime(i)

df_1 = pd.DataFrame(list(zip(course, reoc, start, end, DIreoc, DIstart, DIend, FIdate, FIstart, FIend)),
               columns =['course', 'reoc', 'start', 'end', 'DIreoc', 'DIstart', 'DIend', 'FIdate', 'FIstart', 'FIend'])

print(df_1)

# df_1.to_excel("output3.xlsx")
