import argparse
import torch

import torch.nn.functional as F

from Models import get_model
from Process import *
from translate import translate


# Hyperparameters
parser = argparse.ArgumentParser()
parser.add_argument('-load_weights', default="weights")
parser.add_argument('-k', type=int, default=3)
parser.add_argument('-max_len', type=int, default=80)
parser.add_argument('-d_model', type=int, default=512)
parser.add_argument('-n_layers', type=int, default=6)
parser.add_argument('-src_lang', default="vi")
parser.add_argument('-trg_lang', default="en")
parser.add_argument('-heads', type=int, default=8)
parser.add_argument('-dropout', type=int, default=0.1)
parser.add_argument('-device', type=int, default=-1)
parser.add_argument('-floyd', action='store_true')

opt = parser.parse_args()

# Init model
src, trg = create_fields(opt)
model = get_model(opt, len(src.vocab), len(trg.vocab))

def model_predict(sentence):
    """
    Prediction function for translation app
    :param sentence: (str) input sentence Vietnamese
    :return: (str) translated sentence Bana
    """
    opt.text = sentence
    phrase = translate(opt, model, src, trg)
    return phrase
