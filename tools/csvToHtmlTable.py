import pandas as pd

df = pd.read_csv('../data/foodList.csv')

html_string = '''
{table}
'''

with open('tmp.html', 'w') as f:
    f.write(html_string.format(table=df.to_html(index=False)))